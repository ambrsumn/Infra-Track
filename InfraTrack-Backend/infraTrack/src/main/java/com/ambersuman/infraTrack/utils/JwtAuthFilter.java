package com.ambersuman.infraTrack.utils;

import com.ambersuman.infraTrack.entities.User;
import com.ambersuman.infraTrack.repository.UserRepository;
import com.ambersuman.infraTrack.services.CustomUserDetailsService;

import com.sun.net.httpserver.Authenticator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserRepository userRepo;

    @Autowired
    public JwtAuthFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService, UserRepository userRepo) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userRepo = userRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        String token = null;
        String userEmail = null;
        String roleName = null;

//        System.out.println(authHeader);


        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);


            try {
//                System.out.println("YESSS");
                userEmail = jwtUtil.extractUsername(token);
                roleName = jwtUtil.extractRole(token);

//                System.out.println(userEmail + roleName);
//                System.out.println("Extracted userEmail: " + userEmail);
//                System.out.println("Extracted roleName from token: " + roleName);

                if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                    System.out.println("YE YE");
                    UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

                    // Extract role from token

                    // ✅ Set authorities (Spring expects ROLE_ prefix for roles)
                    var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + roleName));

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, authorities
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // ✅ Set authentication context
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }

            } catch (ExpiredJwtException e) {

                System.out.println("TOKEN EXPIRED ");
                Claims claims = null;
                claims = e.getClaims();
//                System.out.println(claims);
                userEmail = claims.getSubject();
                System.out.println(userEmail);

                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                Optional<User> user = userRepo.findByEmail(userEmail);
                if(!user.isEmpty())
                {
                    User retrivedUser = user.get();
                    roleName = retrivedUser.getRoleName();

                    System.out.println("GENERATING NEW TOKEN...");
                    System.out.println(roleName);

                    String newToken = jwtUtil.generateToken(userDetails, roleName);
                    System.out.println(newToken);
//                    response.getWriter().write("token" + newToken);
                    response.setStatus(200);
                    response.setContentType("application/json");
//                    response.getWriter().write("{\"token\": \"" + newToken + "\n\"}");
                    String jsonResponse = String.format(
                            "{\"message\": \"Token has expired\", \"token\": \"%s\"}",
                            newToken
                    );

                    response.getWriter().write(jsonResponse);


                }
                else
                {

                    response.getWriter().write("\"message\": \"Token has expired\"}");
                }

//                response.getWriter().write("{\"token\": );

                return;

            } catch (JwtException e) {
                // Covers: SignatureException, MalformedJwtException, UnsupportedJwtException, etc.
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\": \"Invalid token\"}");
                return;

            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write("{\"message\": \"Token validation failed\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
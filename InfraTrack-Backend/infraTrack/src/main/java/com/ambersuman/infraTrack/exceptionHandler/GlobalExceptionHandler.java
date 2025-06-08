package com.ambersuman.infraTrack.exceptionHandler;

import com.ambersuman.infraTrack.models.GlobalResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity globalExceptionResponse(Exception e)
    {
        GlobalResponse res = new GlobalResponse(e.getMessage(), System.currentTimeMillis(), HttpStatus.INTERNAL_SERVER_ERROR.value());

        return ResponseEntity.internalServerError().body(res);
    }
}

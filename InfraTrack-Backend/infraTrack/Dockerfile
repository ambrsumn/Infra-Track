# Stage 1: Build with Maven and JDK 21
FROM maven:3.9.2-jdk-21 AS build

WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build jar skipping tests
RUN mvn clean package -DskipTests

# Stage 2: Run with lightweight JDK 21 runtime
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose default Spring Boot port
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]

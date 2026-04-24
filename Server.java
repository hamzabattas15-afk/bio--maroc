import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Server {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/", exchange -> handleFile(exchange, "index.html", "text/html"));
        server.createContext("/index.html", exchange -> handleFile(exchange, "index.html", "text/html"));
        server.createContext("/login.html", exchange -> handleFile(exchange, "login.html", "text/html"));
        server.createContext("/dashboard.html", exchange -> handleFile(exchange, "dashboard.html", "text/html"));
        server.createContext("/style.css", exchange -> handleFile(exchange, "style.css", "text/css"));
        server.createContext("/assets/app.js", exchange -> handleFile(exchange, "assets/app.js", "application/javascript"));
        server.createContext("/assets/images/", exchange -> {
            String path = exchange.getRequestURI().getPath().substring(1);
            handleFile(exchange, path, "image/svg+xml");
        });

        server.start();
        System.out.println("Serveur lance sur http://localhost:8080");
    }

    static void handleFile(HttpExchange exchange, String path, String type) {
        try {
            byte[] data = Files.readAllBytes(Paths.get(path));
            exchange.getResponseHeaders().add("Content-Type", type + "; charset=UTF-8");
            exchange.sendResponseHeaders(200, data.length);
            OutputStream output = exchange.getResponseBody();
            output.write(data);
            output.close();
        } catch (Exception e) {
            try {
                String message = "Erreur: " + e.getMessage();
                exchange.sendResponseHeaders(404, message.getBytes().length);
                OutputStream output = exchange.getResponseBody();
                output.write(message.getBytes());
                output.close();
            } catch (Exception ignored) {}
        }
    }
}

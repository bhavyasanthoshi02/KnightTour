import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;

public class Server {

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(new InetSocketAddress(8081), 0);

        server.createContext("/tour", exchange -> {

            String query = exchange.getRequestURI().getQuery();

            int n=8, r=0, c=0;

            if (query != null) {
                for (String p : query.split("&")) {
                    String[] kv = p.split("=");
                    if (kv[0].equals("n")) n=Integer.parseInt(kv[1]);
                    if (kv[0].equals("r")) r=Integer.parseInt(kv[1]);
                    if (kv[0].equals("c")) c=Integer.parseInt(kv[1]);
                }
            }

            int[][] result = KnightTour.generateUniqueTour(n,r,c);
            if (result == null) {
    String msg = "{\"error\":\"NO_ROUTE\"}";
    byte[] res = msg.getBytes();

    exchange.getResponseHeaders().add("Access-Control-Allow-Origin","*");
    exchange.sendResponseHeaders(200,res.length);

    OutputStream os = exchange.getResponseBody();
    os.write(res);
    os.close();
    return;
}

            StringBuilder json = new StringBuilder("[");
            for (int i=0;i<n;i++) {
                json.append("[");
                for (int j=0;j<n;j++) {
                    json.append(result[i][j]);
                    if (j<n-1) json.append(",");
                }
                json.append("]");
                if (i<n-1) json.append(",");
            }
            json.append("]");

            byte[] res = json.toString().getBytes();

            exchange.getResponseHeaders().add("Access-Control-Allow-Origin","*");
            exchange.sendResponseHeaders(200,res.length);

            OutputStream os = exchange.getResponseBody();
            os.write(res);
            os.close();
        });

        server.start();
        System.out.println("Server running at http://localhost:8081");
    }
}
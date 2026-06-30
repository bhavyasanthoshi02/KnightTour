import java.util.*;

public class KnightTour {

    static int[] dx = {2,1,-1,-2,-2,-1,1,2};
    static int[] dy = {1,2,2,1,-1,-2,-2,-1};

    static Random rand = new Random();

    static boolean isValid(int x, int y, int n, int[][] board) {
        return x>=0 && y>=0 && x<n && y<n && board[x][y]==-1;
    }

    static int getDegree(int x, int y, int n, int[][] board) {
        int count = 0;
        for (int i=0;i<8;i++) {
            if (isValid(x+dx[i], y+dy[i], n, board)) count++;
        }
        return count;
    }

    public static int[][] generateTour(int n, int x, int y) {

        x = Math.max(0, Math.min(x, n-1));
        y = Math.max(0, Math.min(y, n-1));

        int[][] board = new int[n][n];
        for (int[] row: board) Arrays.fill(row, -1);

        board[x][y] = 0;

        for (int move=1; move<n*n; move++) {

            List<int[]> candidates = new ArrayList<>();
            int minDeg = 9;

            List<Integer> order = new ArrayList<>();
            for (int i=0;i<8;i++) order.add(i);
            Collections.shuffle(order);

            for (int i: order) {
                int nx = x + dx[i];
                int ny = y + dy[i];

                if (isValid(nx, ny, n, board)) {
                    int deg = getDegree(nx, ny, n, board);

                    if (deg < minDeg) {
                        candidates.clear();
                        minDeg = deg;
                    }
                    if (deg == minDeg) {
                        candidates.add(new int[]{nx, ny});
                    }
                }
            }

            if (candidates.isEmpty()) return null;

            int[] next = candidates.get(rand.nextInt(candidates.size()));
            x = next[0];
            y = next[1];
            board[x][y] = move;
        }

        return board;
    }

    public static int[][] generateUniqueTour(int n, int x, int y) {
        int[][] res;
        int attempts = 0;

        do {
            res = generateTour(n, x, y);
            attempts++;
        } while (res == null && attempts < 200);

        return res;
    }
}
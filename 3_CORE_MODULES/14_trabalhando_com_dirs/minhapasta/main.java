import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);

        System.out.print("Informe o número de linhas das matrizes: ");
        int linhas = entrada.nextInt();

        System.out.print("Informe o número de colunas das matrizes: ");
        int colunas = entrada.nextInt();

        int[][] matrizA = inicializarMatriz(linhas, colunas);
        int[][] matrizB = inicializarMatriz(linhas, colunas);

        System.out.println("Informe os elementos da Matriz A:");
        for (int i = 0; i < linhas; i++) {
            for (int j = 0; j < colunas; j++) {
                exibirMatrizComPlaceholder(matrizA, "X");
                System.out.print("Elemento [" + i + "][" + j + "]: ");
                matrizA[i][j] = entrada.nextInt();
            }
        }

        System.out.println("Informe os elementos da Matriz B:");
        for (int i = 0; i < linhas; i++) {
            for (int j = 0; j < colunas; j++) {
                exibirMatrizComPlaceholder(matrizB, "X");
                System.out.print("Elemento [" + i + "][" + j + "]: ");
                matrizB[i][j] = entrada.nextInt();
            }
        }

        int[][] matrizC = multiplicarMatrizes(matrizA, matrizB);

        exibirMatrizesJuntas(matrizA, matrizB, matrizC);
    }

    public static int[][] inicializarMatriz(int linhas, int colunas) {
        return new int[linhas][colunas];
    }

    public static void exibirMatrizComPlaceholder(int[][] matriz, String placeholder) {
        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[0].length; j++) {
                if (matriz[i][j] == 0) {
                    System.out.print(placeholder + " ");
                } else {
                    System.out.print(matriz[i][j] + " ");
                }
            }
            System.out.println();
        }
    }

    public static int[][] multiplicarMatrizes(int[][] matrizA, int[][] matrizB) {
        int linhas = matrizA.length;
        int colunas = matrizB[0].length;
        int[][] matrizC = new int[linhas][colunas];

        for (int i = 0; i < linhas; i++) {
            for (int j = 0; j < colunas; j++) {
                for (int k = 0; k < colunas; k++) {
                    matrizC[i][j] += matrizA[i][k] * matrizB[k][j];
                }
            }
        }
        return matrizC;
    }

    public static void exibirMatrizesJuntas(int[][] matrizA, int[][] matrizB, int[][] matrizC) {
        for (int i = 0; i < matrizA.length; i++) {
            for (int j = 0; j < matrizA[0].length; j++) {
                System.out.print(matrizA[i][j] + " ");
            }
            if (i == matrizA.length / 2) {
                System.out.print(" x ");
            } else {
                System.out.print("    ");
            }
            for (int j = 0; j < matrizB[0].length; j++) {
                System.out.print(matrizB[i][j] + " ");
            }
            if (i == matrizA.length / 2) {
                System.out.print(" = ");
            } else {
                System.out.print("    ");
            }
            for (int j = 0; j < matrizC[0].length; j++) {
                System.out.print(matrizC[i][j] + " ");
            }
            System.out.println();
        }
    }
}

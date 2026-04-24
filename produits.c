#include <stdio.h>

struct Produit {
    int id;
    char nom[50];
    float prix;
    int stock;
};

int main() {
    struct Produit produits[3] = {
        {1, "Huile de Figue", 34.00, 10},
        {2, "Huile d'Argan", 24.90, 15},
        {3, "Miel d'Origan", 50.00, 8}
    };

    printf("=== Gestion simple des produits BioMaroc ===\n\n");
    for (int i = 0; i < 3; i++) {
        printf("ID: %d\nNom: %s\nPrix: %.2f EUR\nStock: %d\n-------------------------\n",
               produits[i].id, produits[i].nom, produits[i].prix, produits[i].stock);
    }
    return 0;
}

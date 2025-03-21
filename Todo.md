# ToDo - Améliorations et raccourcis

## Raccourcis pris
1. **Gestion des erreurs** : 
   - La gestion des erreurs (nombres negatives).
   - Une alerte simple est utilisée pour désactiver le taux fixe en cas de variation de plus de 2%.

2. **Tests unitaires** : 
   - Aucun test unitaire ou d'intégration n'a été implémenté pour valider le comportement du composant.

3. **UX/UI** : 
   - L'interface utilisateur est basique (une meilleure mise en page).

4. **Performance** : 
   - Le polling du taux de change est fait toutes les 3 secondes, ce qui pourrait être optimisé pour éviter des recalculs inutiles.

5. **Internationalisation** : 
   - Le texte est en français, mais aucune prise en charge de l'internationalisation (i18n) n'a été ajoutée pour d'autres langues.

6. **Historique persistant** : 
   - L'historique des conversions est stocké en mémoire et est perdu lors du rechargement de la page. Une solution de stockage local (localStorage) pourrait être ajoutée.

7. **Documentation** : 
   - La documentation est minimale. Un README détaillé et un guide de contribution sont nécessaires.

8. **Déploiement continu** : 
   - Aucun pipeline CI/CD n'a été configuré pour automatiser les tests et le déploiement.

9. **Graphiques et notifications** : 
    - Aucun graphique ou système de notifications n'a été implémenté pour améliorer l'expérience utilisateur.

---

## Améliorations possibles
1. **Ajouter des tests** : 
   - Implémenter des tests unitaires et d'intégration avec Jest et React Testing Library.

2. **Améliorer l'UX/UI** : 
   - Utiliser une bibliothèque UI comme Material-UI ou TailwindCSS pour un design plus moderne.

3. **Gestion des erreurs** : 
   - Ajouter une gestion des erreurs plus robuste pour les entrées invalides ou les taux de change extrêmes.


5. **Performance** : 
   - Optimiser le polling pour éviter des recalculs inutiles.

6. **Internationalisation** : 
   - Ajouter la prise en charge de plusieurs langues.

7. **Persistance de l'historique** : 
   - Utiliser `localStorage` pour sauvegarder l'historique des conversions entre les rechargements de page.

8. **API réelle** : 
   - Remplacer le taux de change simulé par une API réelle .

9. **Documentation** : 
   - Rédiger un README détaillé, un guide de contribution, et un journal des modifications (CHANGELOG).

10. **Déploiement continu** : 
    - Configurer GitHub Actions pour automatiser les tests et le déploiement sur Netlify ou Vercel.

11. **Graphiques** : 
    - Ajouter un graphique pour visualiser l'évolution du taux de change (avec Chart.js ou Recharts).

12. **Notifications** : 
    - Implémenter des notifications en temps réel pour informer l'utilisateur des variations importantes du taux de change.
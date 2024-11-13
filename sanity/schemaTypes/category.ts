// category.js ou category.ts

export default {
  name: 'category',
  type: 'document',
  title: 'Categories',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Category Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name', // Génère le slug à partir du champ `name`
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-') // Remplace les espaces par des tirets
            .replace(/[àâäã]/g, 'a') // Remplace les accents par leurs équivalents
            .replace(/[éèêë]/g, 'e')
            .replace(/[îï]/g, 'i')
            .replace(/[ôö]/g, 'o')
            .replace(/[ùûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9-]/g, '') // Retire les caractères non valides pour une URL
            .slice(0, 200), // Limite le slug à 200 caractères
      },
    },
  ],
}

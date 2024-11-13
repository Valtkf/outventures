// subcategory.js ou subcategory.ts

export default {
  name: 'subcategory',
  type: 'document',
  title: 'Subcategory',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Subcategory Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[àâäã]/g, 'a')
            .replace(/[éèêë]/g, 'e')
            .replace(/[îï]/g, 'i')
            .replace(/[ôö]/g, 'o')
            .replace(/[ùûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 200),
      },
    },
  ],
}

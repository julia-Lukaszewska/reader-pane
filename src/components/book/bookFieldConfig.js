//-----------------------------------------------------------------------------
//------ Define the configuration for book fields in the Book component 
//-----------------------------------------------------------------------------
export const bookFieldConfig = {
  title: { label: 'Title', editable: false },
  author: { label: 'Author', editable: false },
  rating: { label: 'Rating', editable: true, default: '0' },
  tags: { label: 'Tags', editable: true, default: '' },
  publishedYear: { label: 'Published Year', editable: false },
  createdAt: { label: 'Added', editable: false },
  updatedAt: { label: 'Updated', editable: false },
  lastReadAt: { label: 'Last Read', editable: false },
  progress: { label: 'Progress', editable: false },
  isFavorite: { label: 'Favorite', editable: false },
}

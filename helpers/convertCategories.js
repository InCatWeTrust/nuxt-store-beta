export default function (categories) {
  const converted = []

  if (categories && categories.length > 0) {
    categories.forEach((item) => {
      const categoryId = item.id

      const category = {
        ...item,
        child: [],
        parent: []
      }

      if (item.children && item.children.length > 0) {
        item.children.forEach((sub) => {
          const subId = sub.id

          const subCategory = {
            ...sub,
            child: [],
            parent: [categoryId]
          }

          if (sub.children && sub.children.length > 0) {
            sub.children.forEach((subsub) => {
              const subsubCategory = {
                ...subsub,
                child: [],
                parent: subCategory.parent.concat([subId])
              }

              subCategory.child.push(subsubCategory)
            })
          }

          category.child.push(subCategory)
        })
      }

      converted.push(category)
    })
  }

  return converted
}

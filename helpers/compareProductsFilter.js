export default function (data) {
  const sortedProducts = []
  const categoriesArr = []
  const diffProps = []
  const filteredDiffProps = []

  // Обрабатываем массив который пришел в функцию
  // и записываем в пустые массивы все категории и
  // отсортированные товары по категориям
  for (const item of data) {
    const index = categoriesArr.indexOf(item.categoryName)

    if (index < 0) {
      categoriesArr.push(item.categoryName)
      sortedProducts.push([item])
    } else {
      sortedProducts[index].push(item)
    }
  }

  for (const products of sortedProducts) {
    const propNames = []
    const propValues = []
    diffProps[sortedProducts.indexOf(products)] = []

    if (products.length > 1) {
      for (const product of products) {
        const productIndex = products.indexOf(product)

        for (const prop of product.props) {
          const propIndex = product.props.indexOf(prop)

          if (productIndex === 0) {
            propNames.push(prop.name)
            propValues.push(prop.value)
          } else if (propNames[propIndex] === prop.name && propValues[propIndex] !== prop.value) {
            diffProps[sortedProducts.indexOf(products)].push(prop.name)
          }
        }
      }
    }

    const filterDiff = diffProps[sortedProducts.indexOf(products)].filter((item, index) => {
      return diffProps[sortedProducts.indexOf(products)].indexOf(item) === index
    })

    filteredDiffProps[sortedProducts.indexOf(products)] = []
    filteredDiffProps[sortedProducts.indexOf(products)].push(filterDiff)
  }

  return {
    categories: categoriesArr,
    props: filteredDiffProps,
    products: sortedProducts
  }
}

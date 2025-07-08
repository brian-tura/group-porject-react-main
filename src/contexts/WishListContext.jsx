import { createContext, useContext, useState, useEffect } from "react";

const WishListContext = createContext()

export const WishListProvider = ({ children }) => {

    const [wishListProducts, setWishListProducts] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    const loadWishList = () => {
        const storedWishList = JSON.parse(localStorage.getItem("wishList")) || {}
        const products = Object.values(storedWishList)
        setWishListProducts(products)
    }

    const addToWishList = (product) => {
        const wishList = JSON.parse(localStorage.getItem("wishList")) || {}

        if (wishList[product.id]) {
            wishList[product.id].quantity += 1
        } else {
            wishList[product.id] = { ...product, quantity: 1 }
        }

        localStorage.setItem("wishList", JSON.stringify(wishList))
        setShowAlert(true)

        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
        loadWishList()
    }

    const removeFromWishList = (product) => {
        const wishList = JSON.parse(localStorage.getItem("wishList")) || {}

        if (!wishList[product.id]) return

        if (wishList[product.id].quantity > 1) {
            wishList[product.id].quantity -= 1
        } else {
            delete wishList[product.id]
        }
        localStorage.setItem("wishList", JSON.stringify(wishList))
        loadWishList()
    }

    const clearWishList = () => {
        localStorage.removeItem("wishList")
        setWishListProducts([]);
        loadWishList()
    }

   
    useEffect(() => {
        loadWishList()
    }, [])


    return (
        <WishListContext.Provider value={{ wishListProducts, addToWishList, loadWishList, clearWishList, removeFromWishList, showAlert}}>
            {children}
        </WishListContext.Provider>
    )
}

export const useWishList = () => useContext(WishListContext)
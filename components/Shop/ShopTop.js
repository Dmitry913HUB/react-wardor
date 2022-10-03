import React from 'react'
import "../../styles/Shop/ShopTop.css"

export default function ShopTop({token,setToken}) {

    const changeToken=(tok)=>{
        setToken(tok)
    }


    return (
        <div className="shop-top">
            <h1 className="main-h top100">SHOP</h1>
            <div className="shop-select-token-buttons">
                <div 
                className={token=='ENG'?"unselectable center shop-token-button active":"unselectable center shop-token-button"}
                onClick={()=>changeToken({name:'ENG',address:'tokenswardor'})}
                >
                    ENG
                </div>
                <div className={token=='CNT'?"unselectable center shop-token-button active":"unselectable center shop-token-button"}
                onClick={()=>changeToken({name:'CNT',address:'tokenswardor'})}
                >
                    CNT
                </div>
                <div className={token=='WDC'?"unselectable center shop-token-button active":"unselectable center shop-token-button"}
                onClick={()=>changeToken({name:'WDC',address:'tokenswardor'})}
                >
                    WDC
                </div>
            </div>
        </div>
    )
}

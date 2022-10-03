import React,{useState,useEffect} from 'react'
import '../../styles/Shop/ShopInventory.css'
import ShopItem from './ShopItem'
// import '../../img/wd.jpg'

export default function ShopInventory({items,token,images,slots,setUpdate,names,whitelist,balances,setModalShow}) {
   
    return (
        <div className="container-md">
            <div className="row justify-content-center">
                {
                    items.map((item)=>{
                        if(item.token==token.name) return <ShopItem item={item} image={images[item.templateIdInt]} token={token} slots={slots} setUpdate={setUpdate} names={names} balance={balances[item.token]} setModalShow={setModalShow} whitelist={whitelist}/>
                    })
                }
                
            </div>
        </div>
    )
}

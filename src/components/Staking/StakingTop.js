import React, {useEffect, useState} from 'react'
import "../../styles/Staking/StakingTop.css"
import {Button} from 'react-bootstrap'
import {UserService} from "../../UserService";

const axios = require('axios')

export default function StakingTop({
                                       pool,
                                       setPool,
                                       balances,
                                       claimedENG,
                                       claimedWDC,
                                       claimedCNT,
                                       setUpdate,
                                       activepools
                                   }) {
    const setterPool = (alfa) => {
        setPool(alfa)
    }

    var tokens_to_claim = () => {
        if (pool == "Main Pool")
            return {tkn_to_clm: claimedWDC, pool: "mainpooltbl"}
        if (pool == "Construction Pool")
            return {tkn_to_clm: claimedCNT, pool: "constpooltbl"}
        else
            return {tkn_to_clm: claimedENG, pool: "warpooltbl"}
    }
    ////console.log(tokens_to_claim().tkn_to_clm)
    const claim = () => {
        try {
            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: 'wrdrstake.gm',
                                name: "claim",
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: "active",
                                    },
                                ],
                                data: {
                                    authorized_account: UserService.authName,
                                    from: UserService.authName,
                                    amount: tokens_to_claim().tkn_to_clm,
                                    pool: tokens_to_claim().pool
                                },
                            },
                        ],
                    },
                    {
                        blocksBehind: 3,
                        expireSeconds: 30,
                    }
                )
                .then((response) => {
                    // ////console.log("Im here")
                    if (response.status === "executed") {
                        setTimeout(() => {
                            setUpdate(Math.random())
                        }, 1000);
                    }
                });
        } catch (e) {
            ////console.log('ERROR: ', e.message);
            alert(e.message);
        }
    }

    return (
        <div className="container-fluid staking-top">
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-5 center">
                    <div className="row center">
                        <div className='col-auto'>
                            <div className="main-h top10">
                                {pool.toUpperCase()}
                            </div>

                            <div className="info-p-balance info-p-border">
                                <div>USER BALANCE:</div>
                                <div>{balances.WAX} WAX</div>
                                <div><img src={require("../../img/ENG.svg").default}></img> {balances.ENG || 0} ENG
                                </div>
                                <div><img src={require("../../img/CNT.svg").default}></img> {balances.CNT || 0} CNT
                                </div>
                                <div><img src={require("../../img/WDC.svg").default}></img> {balances.WDC || 0} WDC
                                </div>
                            </div>

                            <div className="row center">
                                <div className='col-auto info-p-balance'>
                                    Tokens to Claim: <br/>
                                    {(tokens_to_claim().pool == "mainpooltbl") ? (
                                        <img src={require("../../img/WDC.svg").default}></img>) : (<></>)}
                                    {(tokens_to_claim().pool == "constpooltbl") ? (
                                        <img src={require("../../img/CNT.svg").default}></img>) : (<></>)}
                                    {(tokens_to_claim().pool == "warpooltbl") ? (
                                        <img src={require("../../img/ENG.svg").default}></img>) : (<></>)}
                                    {" " + tokens_to_claim().tkn_to_clm}
                                    {(tokens_to_claim().pool == "mainpooltbl") ? (' WDC') : (<></>)}
                                    {(tokens_to_claim().pool == "constpooltbl") ? (' CNT') : (<></>)}
                                    {(tokens_to_claim().pool == "warpooltbl") ? (' ENG') : (<></>)}
                                </div>
                                <div className="col-3 center">
                                    <Button variant="secondary" className='main-pool-dropdown-toggle' onClick={() => {
                                        claim()
                                    }}>
                                        CLAIM
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-12 col-sm-12 col-md-12 col-lg-7 center">
                    <div className="row center">
                        <div className="col-auto center">
                            <div className='comingsoon'>{activepools.mainpooltbl ? '' : 'Not available'}</div>
                            <div
                                className={pool == 'Main Pool' ? "unselectable staking-pool-choice choisen" : (activepools.mainpooltbl ? "unselectable staking-pool-choice" : "unselectable staking-pool-block")}
                                onClick={() => {
                                    if (activepools.mainpooltbl) setterPool('Main Pool')
                                }}
                            >
                                <img src={require("../../img/Frame.png").default}
                                     className="staking-pool-img"></img>
                                {/* <div className="staking-pool-underline"/> */}
                            </div>
                        </div>
                        <div className="col-auto center">
                            <div className='comingsoon'>{activepools.warpooltbl ? '' : 'Not available'}</div>
                            <div
                                className={pool == 'Warpass Pool' ? "unselectable staking-pool-choice choisen" : (activepools.warpooltbl ? "unselectable staking-pool-choice" : "unselectable staking-pool-block")}
                                onClick={() => {
                                    if (activepools.warpooltbl) setterPool('Warpass Pool')
                                }}
                            >
                                <img
                                    src={require("../../img/waspass.png").default}
                                    className="staking-pool-img"></img>
                                {/* <div className="staking-pool-underline"/> */}
                            </div>
                        </div>
                        <div className="col-auto center">
                            <div className='comingsoon'>{activepools.constpooltbl ? '' : 'Not available'}</div>
                            <div
                                className={pool == 'Construction Pool' ? "unselectable staking-pool-choice choisen" : (activepools.constpooltbl ? "unselectable staking-pool-choice" : "unselectable staking-pool-block")}
                                onClick={() => {
                                    if (activepools.constpooltbl) setterPool('Construction Pool')
                                }}
                            >
                                <img src={require("../../img/building-pool.png").default}
                                     className="staking-pool-img"></img>
                                {/* <div className="center staking-pool-underline"/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}








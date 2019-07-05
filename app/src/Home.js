import React, { Component } from "react";
import "./Home.scss";

const axios = require('axios');


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifts: []
        };
        this.clickHandlerClose = this.clickHandlerClose.bind(this);
    }

    clickHandlerGift(gift_id) {
        function fadeIn(target) {
            target.classList.add('show');
            target.classList.remove('hide')
        }

        function setOpenDate(gift_id, date_json) {
            axios.put(
            "/api/v1.0/gift/" + gift_id + "/open",
            JSON.stringify(date_json),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authorizationToken')
                }
            }
            )
            .then(
                response => {
                    console.log(response.data);
                }
            )
            .catch(
                error => {
                    console.log(error);
                });
        }

        setOpenDate(gift_id, {'open_date': Math.floor(Date.now() / 1000)});
        setTimeout(function ()
        {
            fadeIn(document.getElementById('gift_container'));
            document.querySelectorAll(`div[data-gift-id="${gift_id}"]`)[0].classList.remove('hidden');
            document.querySelectorAll(`img[data-gift-id="${gift_id}"]`)[0].src = "../images/open_gift.svg";
        }, 500);
    }

    clickHandlerClose() {
        function fadeOut(target) {
            target.classList.add('hide');
            target.classList.remove('show')
        }

        fadeOut(document.getElementById('gift_container'));
        document.querySelectorAll('.gift_content:not(.hidden)')[0].classList.add('hidden');
    }

    getGifts() {
        axios.get(
                "/api/v1.0/gifts",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('authorizationToken')
                    }
                }
            )
            .then(
                response => {
                    this.setState({gifts: response.data['gifts']});
                }
            )
            .catch(
                error => {
                    if(error.response.status === 423)
                    {
                        this.props.userHasAuthorized(false);
                        this.props.history.push("/auth");
                    }
                    else
                    {
                        console.log(error)
                    }
                }
            );
    }

    createGiftsList(giftsData) {
        try {
            return (
                Object.keys(giftsData).map(
                index =>
                    <li key={index} className="list_item" onClick={this.clickHandlerGift.bind(null, giftsData[index]['id'])}>
                        <div className="container">
                            <div className="img">
                                <img
                                    data-gift-id={giftsData[index]['id']}
                                    src={giftsData[index]['open_date'] ? "../images/open_gift.svg" : "../images/gift.svg"}
                                    alt="gift"
                                />
                            </div>
                        </div>
                    </li>
                )
            );
        }
        catch(error) {
            return(<p>No gifts here:(</p>);
        }
    }

    createGiftsDetailed(giftsData) {
        try {
            return (
                Object.keys(giftsData).map(
                index =>
                    <div data-gift-id={giftsData[index]['id']} className="gift_content hidden">
                        <img src={giftsData[index]['img_url']} alt={giftsData[index]['type']}/>
                        <div className="gift_data" dangerouslySetInnerHTML={{ __html: giftsData[index]['data'] }}></div>
                    </div>
                )
            );
        }
        catch(error) {
            return(<p>No gifts here:(</p>);
        }
    }

    componentDidMount() {
        if(localStorage.getItem('isAuthorized') === 'false') this.props.history.push("/auth");
        this.getGifts();
    }

    render() {
        return (
            <div className="Home">
                <div className="wrapper">
                    <ul className="list">
                        { this.createGiftsList(this.state.gifts) }
                    </ul>
                    <div id="gift_container" className="hide">
                        <div className="gift">
                            <header className="gift_header">
                                <div id="btn_close" onClick={this.clickHandlerClose}></div>
                            </header>
                            { this.createGiftsDetailed(this.state.gifts) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
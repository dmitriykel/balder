import React, { Component } from "react";
import "./Home.scss";
import $ from "jquery";

const axios = require('axios');


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifts: []
        };
    }

    createGiftsList(giftsData) {
        try {
            return (
                Object.keys(giftsData).map(
                index =>
                    <li key={index} className="list_item">
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
                        <img src={giftsData[index]['img_url']}/>
                        <p>{giftsData[index]['data']}</p>
                    </div>
                )
            );
        }
        catch(error) {
            return(<p>No gifts here:(</p>);
        }
    }

    componentDidMount() {
        if(!localStorage.getItem('isAuthorized')) this.props.history.push("/auth");

        axios.get("/api/v1.0/gifts")
        .then(
            response => {
                this.setState({gifts: response.data['gifts']});
                console.log(response.data['gifts'])
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        );

        function setOpenDate(gift_id, date_json) {
            axios.put(
            "/api/v1.0/" + gift_id + "/open",
            JSON.stringify(date_json),
            {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:5000',
                    'Content-Type': 'application/json'
                }
            }
            )
            .then(
                response => {
                    console.log(response);
                }
            )
            .catch(
                error => {
                    console.log(error);
                });
        }


        // TODO: GTFO JQUERY
        let hover_active = false;

        $(window).on('load', function() {
          let motion_parts_offset;
          let selected_card_w;
          let selected_card_h;

          hover_active = true;

          $('.list_item').hover(function() {
            if (hover_active) {
              $(this).addClass('hover');

              selected_card_w = $(this).width();
              selected_card_h = $(this).height();
              motion_parts_offset = $(this).offset();

              $('.motion').width(selected_card_w).height(selected_card_h).css({
                top: motion_parts_offset.top,
                left: motion_parts_offset.left
              });
            }
          }, function() {
            $(this).removeClass('hover');
          });

          $('.list_item').on('click', function() {

            if (hover_active) {
                hover_active = false;
                let document_height = $(document).height();
                var gift_id = $(this).find('img').data('gift-id');
                selected_card_w = $(this).width();
                selected_card_h = $(this).height();
                motion_parts_offset = $(this).offset();

                setOpenDate(gift_id, {'open_date': Date.now()});
                $(this).removeClass('hover');

                $('.motion').width(selected_card_w).height(selected_card_h).css({
                top: motion_parts_offset.top,
                left: motion_parts_offset.left
                });

                $('.motion').css('opacity', 1);
                $('.motion').width('100%').height(document_height).css({
                top: 0,
                left: 0,
                zIndex: 5,
                opacity: 1,
                visibility: 'visible'
                });
                console.log(gift_id);

                setTimeout(function() {
                $('.motion').css('position','fixed');
                $('.loading-anime').show();
                $('.gift_container').fadeIn(1000);
                $(`.gift_content[data-gift-id='${gift_id}']`).removeClass('hidden');
                $('.loading-anime').hide();
                }, 500);
                }
          });

          $('.btn_close').on('click', closePage);

          function closePage(){
            $('.gift_container').fadeOut();
            $('.gift_content').not('.hidden').addClass('hidden');
            $('.motion').css('position','absolute');
            setTimeout(function() {
              hover_active = true;
              $('.gift_container').css({
                background: 'none'
              });
            }, 500);
            $('.motion').width(selected_card_w).height(selected_card_h).css({
              top: motion_parts_offset.top,
              left: motion_parts_offset.left,
              zIndex: 0,
              opacity: 0
            }).css('visibility', 'hidden');
            $('.gift_container').css('display', 'none');
          }
        });
    }
  render() {
      return (
          <div className="Home">
              <div className="wrapper">
                  <ul className="list">
                      { this.createGiftsList(this.state.gifts) }
                  </ul>
                  <div className="gift_container">
                      <div className="gift">
                          <header className="gift_header">
                              <div className="btn_close"></div>
                          </header>
                          {this.createGiftsDetailed(this.state.gifts)}
                      </div>
                  </div>
                  <div className="motion"></div>
              </div>
              <div className="loading_anime"></div>
          </div>
      );
  }
}
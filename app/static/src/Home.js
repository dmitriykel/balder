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

    createGifts(giftsData) {
        try {
            return (
                Object.keys(this.state.gifts).map(
                index =>
                    <li key={index} className="list_item">
                        <div className="container">
                            <div className="img">
                                <img data-id="default-true" src="../images/gift.svg" alt="gift"/>
                            </div>
                            <h3>{this.state.gifts[index]['content']}</h3>
                            <p className="description">{giftsData[index]['content']}</p>
                        </div>
                    </li>
                )
            );
        }
        catch(error) {
            return(<p>No gifts here:(</p>);
        }
    }

    componentDidMount() {
        if(!this.props.isAuthorized) this.props.history.push("/auth");
        axios.get("http://127.0.0.1:3000/balder/api/v1.0/gifts")
        .then(
            response => {
                this.setState({gifts: response.data['gifts']});
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        );
    }
  render() {
      return (
          <div className="Home">
              <div className="wrapper">
                  <ul className="list loading">
                      { this.createGifts(this.state.gifts) }
                  </ul>
                  <div className="gift_container">
                      <div className="gift">
                          <header className="gift_header">
                              <div className="btn_close"></div>
                          </header>
                          <div data-id="default-true" className="gift_content hidden">
                              This is test gifts data page <b>TRUE</b>
                          </div>
                          <div data-id="default-false" className="gift_content hidden">
                              This is test gifts data page <b>FALSE</b>
                          </div>
                      </div>
                  </div>
                  <div className="motion"></div>
              </div>
              <div className="loading_anime"></div>
          </div>
      );
  }
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
      $(this).removeClass('hover');

      selected_card_w = $(this).width();
      selected_card_h = $(this).height();
      motion_parts_offset = $(this).offset();

      let document_height = $(document).height();
      var gift_id = $(this).find('img').data('id');

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
        let selected_gift_content = $(`.gift_content[data-id='${gift_id}']`);
        console.log(selected_gift_content);
        $('.gift_container').fadeIn(1000);
        selected_gift_content.removeClass('hidden');
        $('.loading-anime').hide();
      }, 500);
    }
  });

  $('.btn_close').on('click', closePage);
  $('.gift_container').on('click', closePage);
  function closePage(){
    $('.gift_container').fadeOut();
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
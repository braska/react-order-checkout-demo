import React, { Component } from 'react';
import OrderSummary from '../components/OrderSummary';
import Pic1 from '../components/OrderSummary/assets/1.png';
import Pic2 from '../components/OrderSummary/assets/2.png';
import Pic3 from '../components/OrderSummary/assets/3.png';

export default class OrderSummaryContainer extends Component {
  state = {
    items: [
      {
        id: 1,
        title: 'The chelsea boot',
        price: 235,
        description: 'Black',
        quatity: 1,
        img: Pic1,
      },
      {
        id: 2,
        title: 'The twill snap backpack',
        price: 65,
        description: 'Reverse denim + Broken leather',
        quatity: 1,
        img: Pic2,
      },
      {
        id: 3,
        title: 'The twill zip tone',
        price: 48,
        description: 'Reverse denim + Black leather',
        quatity: 1,
        img: Pic3,
      },
    ],
  };

  render() {
    return (
      <OrderSummary {...this.state} />
    );
  }
}

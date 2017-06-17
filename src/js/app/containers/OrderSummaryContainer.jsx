import { connect } from 'react-redux';
import OrderSummary from '../components/OrderSummary';
import {
  setQuantity,
  toggleEditMode,
  deleteItem as handleDelete,
} from '../actions/cart';

export default connect(state => state.cart, {
  setQuantity,
  toggleEditMode,
  handleDelete,
})(OrderSummary);

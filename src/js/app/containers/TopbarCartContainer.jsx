import { connect } from 'react-redux';
import Cart from '../components/Cart';

export default connect(state => ({ counter: state.cart.items.length }))(Cart);

import { connect } from 'react-redux';
import Form from '../components/Form';
import {
  goToStep as handleGoToStep,
} from '../actions/form';

export default connect(state => state.form, { handleGoToStep })(Form);

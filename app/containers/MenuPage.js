import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavMenu from '../components/Menu/NavMenu';
import * as MenuActions from '../actions/menu';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MenuActions, dispatch);
}

export default connect(mapDispatchToProps)(NavMenu);


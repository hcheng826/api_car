import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span>&copy; MakeNTU 2018</span>
        <span className="ml-auto">Powered by <a href="https://make.ntuee.org/#info">MakeNTU Mentors</a></span>
      </footer>
    )
  }
}

export default Footer;

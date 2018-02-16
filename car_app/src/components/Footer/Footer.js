import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span>&copy; MakeNTU 2018</span>
        <span className="ml-auto">Powered by 
          <a href="https://make.ntuee.org/#info" target="_blank" rel="noopener noreferrer">
            {' '}MakeNTU Mentors
          </a>
        </span>
      </footer>
    )
  }
}

export default Footer;

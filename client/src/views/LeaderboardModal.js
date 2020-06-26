import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Icon, InlineIcon } from '@iconify/react';
import { Link } from "react-router-dom";

import xIcon from '@iconify/icons-heroicons-solid/x';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : '1px solid rgba(141, 184, 162, 0.4)',
    width                 : '35%',
    height                : '370px',
    overflow             : 'hidden'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export default function App(){
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

    return (
      <div>
        <div className="analytics__infoLink leaderboard__howDoPointsWork" onClick={openModal}>How Do Points Work?</div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel=""
          style={customStyles}
        >

        <div style={{"overflow-y": "hidden"}}>

        <div className="leaderboardModal__mainTitle">How Do Points Work? <span style={{ "position":"absolute", "margin-left": "6px"}}>💯</span></div>

        <div className="leaderboardModal__topDescription">Offset points are used to create a friendly-competitive atmosphere where all users are motivated to minimise their footprint as best possible. It's approximately equal to one car km.</div>

        <div className="leaderboardModal__getPointsSubtitle">How Can I Get Points?</div>

        <div className="leaderboardModal__numberOne">#1 &nbsp;Buying Sustainable Products &nbsp;📦</div>

        <div className="leaderboardModal__mainPointDescription"> > Look out for the Green-Colored Products!</div>

        <div className="leaderboardModal__numberTwo">#2 &nbsp;Offsetting Your Purchases &nbsp;✖️</div>

        <div className="leaderboardModal__mainPointDescription"> > Use Our <Link to="/offsets" className="analytics__infoLink">Offset Page</Link> to do so!</div>

        <div className="leaderboardModal__numberThree">#3 &nbsp;Referring New Users &nbsp;👪</div>

        <div className="leaderboardModal__mainPointDescription"> > Use The Referral on Your <Link to="/profile" className="analytics__infoLink">Profile</Link>!</div>

        <Icon className="leaderboardModal__xIcon" icon={xIcon} onClick={closeModal} />

        </div>

        </Modal>
      </div>
    );
}

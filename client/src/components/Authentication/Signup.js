import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Signup = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Open modal</button>
            <Modal isOpen={modalIsOpen}
                style = {
                  {
                    overlay: {
                        backgroundColor: '#e8d3c4'
                    },
                    content: {
                        color: '#46483b'
                    }
                  }
                }>
                <h2>Signup</h2>
                <hr/>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="name" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control"/>
                    </div>
                    <button>Submit</button>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                </form>
            </Modal>
        </div>
    );
};

export default Signup;
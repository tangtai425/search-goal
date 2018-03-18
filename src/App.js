import React, { Component } from 'react'
import find from 'lodash.find'
import { getGoalByID, getListByKeyword } from './api'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      profileList: [],
      showGoalProfile: {},
    }
  }

  handleSearchInput = event => this.setState({ searchValue: event.target.value })

  handleClickSearch = async () => {
    const getDataList = await getListByKeyword(this.state.searchValue)
    this.setState({
      profileList: getDataList,
    })
  }

  handleClickShowGoal = (event) => {
    const findGoal = find(this.state.profileList, profile => profile.fb_id === event.target.id)
    this.setState({
      showGoalProfile: findGoal,
    })
  }

  handleCloseModal = () => this.setState({ showGoalProfile: {} })

  renderProfileList = () => this.state.profileList.map(profile => (
    <article className="media" key={profile.fb_id}>
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={`https://graph.facebook.com/${profile.fb_id}/picture?type=square`}/>
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{profile.name}</strong>
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a
              className="button is-primary is-outlined is-small"
              id={profile.fb_id}
              onClick={this.handleClickShowGoal}
            >
              แสดงคำปฏิญาณ
            </a>
          </div>
        </nav>
      </div>
    </article>
  ))

  renderCard = () => (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="field has-addons">
            <div className="control has-icons-left width-100">
              <input
                className="input"
                type="text"
                placeholder="ใส่ชื่อคนที่คุณต้องการค้นหา"
                value={this.state.searchValue}
                onChange={this.handleSearchInput}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <div className="control">
              <a className="button is-info is-outlined" onClick={this.handleClickSearch}>
                ค้นหา
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  renderModal = () => (
    <div className={`modal ${(this.state.showGoalProfile.goal) ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={`https://graph.facebook.com/${this.state.showGoalProfile.fb_id}/picture?type=square`}/>
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{this.state.showGoalProfile.name}</strong> say:
                  <br/>
                  <small>{this.state.showGoalProfile.goal}</small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={this.handleCloseModal}></button>
    </div>
  )

  render() {
    return (
      <div className="App">
        {this.renderModal()}
        <div className="container">
          <div className="notification is-warning">
            <strong>1 คน 1 ความดี เพื่อถวายแด่ในหลวงของเรา</strong>
          </div>
          <div className="columns is-mobile is-centered">
            <div className="column is-half">
              {this.renderCard()}
              {
                (this.state.profileList.length > 0) && (
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                    {this.renderProfileList()}
                    </div>
                  </div>
                </div>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App

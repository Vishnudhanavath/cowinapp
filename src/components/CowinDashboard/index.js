import Loader from 'react-loader-spinner'
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    status: apiStatusConstant.initial,
    last7DaysVaccination: [],
    vaccinationAge: [],
    vaccinationGender: [],
  }

  componentDidMount() {
    this.getAPIDetails()
  }

  getAPIDetails = async () => {
    console.log('API request initiated')
    this.setState({status: apiStatusConstant.in_progress})
    try {
      const response = await fetch(
        'https://apis.ccbp.in/covid-vaccination-data',
      )
      if (response.ok) {
        const jsonData = await response.json()
        const last7DaysVaccination = jsonData.last_7_days_vaccination.map(
          each => ({
            dose1: each.dose_1,
            dose2: each.dose_2,
            vaccineDate: each.vaccine_date,
          }),
        )
        const vaccinationAge = jsonData.vaccination_by_age.map(each => ({
          age: each.age,
          count: each.count,
        }))
        const vaccinationGender = jsonData.vaccination_by_gender.map(each => ({
          count: each.count,
          gender: each.gender,
        }))
        this.setState({
          last7DaysVaccination,
          vaccinationAge,
          vaccinationGender,
          status: apiStatusConstant.success,
        })
      } else if (response.status === 401) {
        this.setState({status: apiStatusConstant.failure})
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({status: apiStatusConstant.failure})
    }
  }

  renderFailureCase = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSuccessCase = () => {
    const {last7DaysVaccination, vaccinationAge, vaccinationGender} = this.state

    return (
      <>
        <VaccinationCoverage Vaccination7Days={last7DaysVaccination} />
        <VaccinationByGender VaccinationGender={vaccinationGender} />
        <VaccinationByAge VaccinationAge={vaccinationAge} />
      </>
    )
  }

  renderLoadingView = () => {
    console.log('Rendering loading view...')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }

  getDetails = () => {
    const {status} = this.state
    console.log(status)
    switch (status) {
      case apiStatusConstant.success:
        return this.renderSuccessCase()
      case apiStatusConstant.failure:
        return this.renderFailureCase()
      case apiStatusConstant.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="logo"
        />
        <h1 className="cowin-heading">co-win</h1>
        <h1 className="description">CoWIN Vaccination in India</h1>
        {this.getDetails()}
      </div>
    )
  }
}

export default CowinDashboard

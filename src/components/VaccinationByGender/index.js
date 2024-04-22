import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'
// const data = [
//   {
//     count: 809680,
//     language: "Telugu",
//   },
//   {
//     count: 4555697,
//     language: "Hindi",
//   },
//   {
//     count: 12345657,
//     language: "English",
//   },
// ]

const VaccinationByGender = props => {
  const {VaccinationGender} = props
  return (
    <div className="chart-bg">
      <h1>Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={VaccinationGender}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#fecba6" />
            <Cell name="Female" fill="#b3d23f" />
            <Cell name="Other" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="middle"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender

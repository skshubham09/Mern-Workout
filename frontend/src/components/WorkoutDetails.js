import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { Icon } from '@iconify/react';
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const {user}= useAuthContext()
  const handleClick = async () => {
    if(!user){
      return
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix:true})}</p>
      <span onClick={handleClick}><Icon icon="mdi:trash-can" width="24" />  </span>
    </div>
  )
}

export default WorkoutDetails
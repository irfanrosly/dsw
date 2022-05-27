import React from 'react'
import '../../src/styles.css'
import {Stepper} from 'dyno-shared-web'
import 'dyno-shared-web/dist/index.css'
const StepperScreen = () => {
    const GBI_STEP_CHOOSE_PLAN = 0
    const GBI_STEP_PLANNING = 1
    const GBI_STEP_RESULT = 2
    const GOAL_SIMULATION_STEPS = [
      { step: GBI_STEP_CHOOSE_PLAN, label: 'abcdef' },
      { step: GBI_STEP_PLANNING, label: 'try try' },
      { step: GBI_STEP_RESULT, label: 'hello ' }
    ]


    return (
        <div style={{marginTop:"1rem"}}>
                
                <h1>Demo for ProgressBar</h1>
            <div>
            <Stepper steps={GOAL_SIMULATION_STEPS} activeStep={GBI_STEP_PLANNING} />
            </div>
        </div>
    )
}

export default StepperScreen;
        const mongoose= require('mongoose')

        const Plan_entry= new mongoose.Schema({
        state: { type: String, required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  crtedAt: { type: Date, default: Date.now }
        
    
        })

        const Plans= mongoose.model('plan_entry',Plan_entry);   
        module.exports=Plans;
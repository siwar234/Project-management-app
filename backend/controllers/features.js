const Feature = require('../models/Features');
const Tickets = require('../models/Tickets');

exports.createFeature = async (req, res) => {

  try {
    const { titleF, startDate,endDate ,projectId} = req.body;

  

    const feature = new Feature({
        titleF: titleF,
        startDate: startDate || null,
        endDate:endDate || null,
        projectId:projectId


    });

    await feature.save();

    res.status(201).json(feature);
  } catch (error) {
    console.error('Error creating feature:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



  
  exports.getListfeatures = async (req, res) => {
    try {
        const { projectId } = req.params;

        

        const features = await Feature.find({ projectId }).populate('Tickets').populate({
          path: 'Tickets',
          populate: [
            { path: 'ResponsibleTicket', model: 'User' },
            { path: 'Feature', model: 'Features' } 
          ]
        });;

        res.status(200).json(features);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};


exports.updateFeature = async (req, res) => {
    try {
        const updatedFeature = await Feature.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedFeature) {
          return res.status(404).json({ message: 'Feature not found' });
        }
        res.status(200).json({ updatedFeature });
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ message: 'Internal server error' });
    }
};







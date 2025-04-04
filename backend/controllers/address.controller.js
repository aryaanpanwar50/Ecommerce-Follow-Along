const Address = require('../models/address.model');

const addressController = {
  // Get all addresses
  getAllAddresses: async (req, res) => {
    try {
      const addresses = await Address.find();
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching addresses' });
    }
  },

  // Add a new address
  addAddress: async (req, res) => {
    try {
      const { type, name, street, city, state, zipCode, phone } = req.body;
      
      // Validate required fields
      if (!type || !name || !street || !city || !state || !zipCode || !phone) {
        return res.status(400).json({ 
          message: 'All fields are required',
          received: req.body 
        });
      }

      const newAddress = new Address({
        type,
        name,
        street,
        city,
        state,
        zipCode,
        phone
      });

      const savedAddress = await newAddress.save();
      res.status(201).json(savedAddress);
    } catch (error) {
      console.error('Address creation error:', error);
      res.status(400).json({ 
        message: 'Error adding address', 
        error: error.message,
        received: req.body 
      });
    }
  },

  // Update an address
  updateAddress: async (req, res) => {
    try {
      const { type, name, street, city, state, zipCode, phone } = req.body;
      
      const updatedAddress = await Address.findByIdAndUpdate(
        req.params.id,
        {
          type,
          name,
          street,
          city,
          state,
          zipCode,
          phone
        },
        { new: true }
      );

      if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }

      res.json(updatedAddress);
    } catch (error) {
      res.status(400).json({ message: 'Error updating address', error: error.message });
    }
  },

  // Delete an address
  deleteAddress: async (req, res) => {
    try {
      const deletedAddress = await Address.findByIdAndDelete(req.params.id);
      
      if (!deletedAddress) {
        return res.status(404).json({ message: 'Address not found' });
      }

      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting address', error: error.message });
    }
  }
};

module.exports = addressController;

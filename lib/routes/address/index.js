const express = require('express');
const router = express.Router();

const multichain = require('multichain-node')({
  port: 8002,
  host: process.env.MC_NODE,
  user: process.env.RPC_USER,
  pass: process.env.RPC_PASSWORD,
});

// public
router.get('/', (req, res, next) => {
  multichain.getAddresses((err, addresses) => {
    if (err) {
      res.status(400);
      return next(new Error(err));
    }

    res.render('addresses', {
      title: 'Address list',
      addresses: addresses,
    });
  });
});

router.post('/', (req, res, next) => {
  multichain.getNewAddress((err, address) => {
    if (err) {
      res.status(400);
      return next(new Error(err));
    }

    res.send({ redirect: response.request.href });
  });
});

router.get('/:id', (req, res, next) => {
  multichain.getAddressBalances({
    address: req.params.id,
    minconf: 1,
    includeLocked: true,
  },
  (err, balances) => {
    if (err) {
      res.status(400);
      return next(new Error(err));
    }

    res.render('addresses', {
      title: 'Address balances',
      balances: balances,
    });
  });

  res.render('address', {});
});

// private methods

// exports

module.exports = router;

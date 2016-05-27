const express = require('express');
const multichain = require('multichain-node');
const router = express.Router();

function TransactionAmount(x, n) {
  this[x] = 1 * n;
}

function SendFromAddressRequest(x, y, a, n) {
  this.from = x;
  this.to = y;
  this.amount = new TransactionAmount(a, n);
}

function IssueToAddressRequest(x, a, n, u) {
  this.address = x;
  this.asset = a;
  this.qty = 1 * n;
  this.unit = 1 * u;
}

const filter = (arr, l) => arr.filter(l);

const render = (res, view) => (model) => res.render(view, model) && res;

const redirect = (res, route) => () => res.redirect(route) && res;

const failWithError = (res, next) => (err) =>
  res.status(400) && next(new Error(typeof err === 'string' ? err : err.message));

const errorCheck = (resolve, reject) => (err, data) =>
  err ? reject(err) : resolve(data);

const multichainPromise = (x) => new Promise((resolve, reject) =>
  router.multichain[x](errorCheck(resolve, reject)));

const multichainPromiseWithOptions = (x, opts) => new Promise((resolve, reject) =>
  router.multichain[x](opts, errorCheck(resolve, reject)));

const createAddressDetailModel = (a) => (r) => ({
    title: 'Address balances',
    address: a,
    recipients: filter(r[1], (x) => x !== a),
    balances: r[0],
  });

const createAddressListModel = () => (addresses) => ({
    title: 'Address list',
    addresses: addresses,
  });

const getAddresses = () =>
        multichainPromise('getAddresses');

const getNewAddress = () =>
        multichainPromise('getNewAddress');

const getAddressBalances = (x, c, l) =>
        multichainPromiseWithOptions('getAddressBalances', {
          address: x,
          minconf: c,
          includeLocked: l,
        });

const grant = (p) => (a) =>
        multichainPromiseWithOptions('grant', {
          addresses: a,
          permissions: p,
        }).then(() => a);

const makeIssueToAddressRequest = (issueToAddressRequest) =>
        multichainPromiseWithOptions('issue', issueToAddressRequest);

const makeSendFromAddressRequest = (sendFromAddressRequest) =>
        multichainPromiseWithOptions('sendFromAddress', sendFromAddressRequest);

// middleware

const setup = (req, res, next) =>
  (router.multichain = router.multichain || multichain(req.app.locals.multichain)) && next();

router.use(setup);

// public

const listAddresses = (req, res, next) =>
  getAddresses()
    .then(createAddressListModel())
    .then(render(res, 'addresslist'))
    .catch(failWithError(res, next));

const createAddress = (req, res, next) =>
  getNewAddress()
    .then(grant('send,receive'))
    .then(redirect(res, '/address/'))
    .catch(failWithError(res, next));

const getAddressDetail = (req, res, next) =>
  Promise.all([
      getAddressBalances(req.params.address, 1, true),
      getAddresses(),
    ])
    .then(createAddressDetailModel(req.params.address))
    .then(render(res, 'address'))
    .catch(failWithError(res, next));

const issueToAddress = (req, res, next) =>
  makeIssueToAddressRequest(new IssueToAddressRequest(req.body.address, req.body.asset, req.body.qty, req.body.unit))
    .then(redirect(res, '/address/'))
    .catch(failWithError(res, next));

const sendFromAddress = (req, res, next) =>
  makeSendFromAddressRequest(new SendFromAddressRequest(req.params.address, req.body.to, req.body.asset, req.body.qty))
    .then(redirect(res, '/address/' + req.params.address))
    .catch(failWithError(res, next));

router.get('/', listAddresses);
router.post('/', createAddress);
router.post('/issue/', issueToAddress);
router.get('/:address', getAddressDetail);
router.post('/:address/send/', sendFromAddress);

// exports
module.exports = router;

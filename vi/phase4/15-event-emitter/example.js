const {EventEmitter} = require('events');

const emitter = new EventEmitter();

emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit('greet', 'Giap');

emitter.on('userLogin', (name) => {
    console.log(`User ${name} logged in.`);
});

emitter.emit('userLogin', 'Giap');

const orderEmitter = new EventEmitter();

orderEmitter.on('orderCreated', (orderData) => {
    console.log(`Order created: ${orderData.id}`);
});

orderEmitter.on('orderCreated', (orderData) => {
    console.log(`Order email: ${orderData.email}`);
});

orderEmitter.emit('orderCreated', {id: 123, email: 'nvg021@gmail.com'});

const initEmitter = new EventEmitter();
initEmitter.once('init', () => {
    console.log('Initialization complete.');
});

initEmitter.emit('init');
initEmitter.emit('init'); // This will not trigger the event again

const testEmitter = new EventEmitter();
testEmitter.on('test', () => {
    console.log('Test event triggered.');
});
testEmitter.emit('test');
testEmitter.removeAllListeners('test');
testEmitter.emit('test'); // No output, as listeners have been removed


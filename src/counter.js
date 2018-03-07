/**
 * Register a reducer to track the count
 *
 *
 * @param {Integer} state The state is just a number.
 * @param {Object} action Action  being disaptched
 * @returns {number}
 */
const reducers = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
};

//Register reducer with WordPress
const state = wp.data.registerReducer( 'countingPlugin', reducers );

//Register selector to get the count from this store
wp.data.registerSelectors('countingPlugin', {
    getCount: (count) => {
        return count;
    }
});
export default state;
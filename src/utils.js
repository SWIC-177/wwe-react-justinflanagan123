/**
 * Retrieves the last name from a full name.
 *
 * @param {string} fullName - The full name.
 * @returns {string} The last name.
 */
export function getLastName(fullName) {
  const splitName = fullName.trim().split(" ");
  return splitName[splitName.length - 1];
}

/**
 * Merges two arrays into an array of objects based on specified keys.
 *
 * @param {Object} options - The options object.
 * @param {Array} options.a1 - The first array.
 * @param {Array} options.a2 - The second array.
 * @param {string} options.key1 - The key for the first array elements.
 * @param {string} options.key2 - The key for the second array elements.
 * @returns {Array} - The merged array of objects.
 */
export function merge2ArraysIntoAnArrayOfObjects({ a1, a2, key1, key2 }) {
  return a1.reduce((acc, item, index) => {
    const accumulatedResults2Modify = [...acc];

    return [
      ...accumulatedResults2Modify,
      {
        [key1]: item,
        [key2]: a2[index],
      },
    ];
  }, []);
}

/**
 * Filters items by a given term.
 *
 * @param {Object} options - The options object.
 * @param {string[]} options.terms1 - The first array of terms.
 * @param {string[]} options.terms2 - The second array of terms.
 * @param {string} options.actionTerm - The term to filter by.
 * @param {boolean} [options.is2Keep=true] - If true, keep the terms...
 * @returns {Object} - The filtered terms.
 */
export function filterItemsByTerm({
  terms1,
  terms2,
  actionTerm,
  is2Keep = true,
}) {
  return actionTerm
    ? terms1.reduce(
        (accumulatedResults, term, index) => {
          const accumulatedResults2Modify = { ...accumulatedResults };

          // If `is2Keep` is true, keep the terms that include the action term.
          if (
            is2Keep &&
            term.toLowerCase().includes(actionTerm.toLowerCase())
          ) {
            accumulatedResults2Modify.terms1 = [
              ...accumulatedResults2Modify.terms1,
              term,
            ];
            accumulatedResults2Modify.terms2 = [
              ...accumulatedResults2Modify.terms2,
              terms2[index],
            ];
          }

          // If `is2Keep` is false, remove terms that include the action term.
          if (
            !is2Keep &&
            !term.toLowerCase().includes(actionTerm.toLowerCase())
          ) {
            accumulatedResults2Modify.terms1 = [
              ...accumulatedResults2Modify.terms1,
              term,
            ];
            accumulatedResults2Modify.terms2 = [
              ...accumulatedResults2Modify.terms2,
              terms2[index],
            ];
          }

          return accumulatedResults2Modify;
        },
        { terms1: [], terms2: [] },
      )
    : { terms1, terms2 };
}

const validateSubscription = (subscription) => {
  const allowedSubscriptions = ["starter", "pro", "business"];
  return allowedSubscriptions.includes(subscription);
};

module.exports = validateSubscription;

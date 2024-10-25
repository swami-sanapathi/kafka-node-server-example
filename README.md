1. Do we need to specify broker in kafka configuration?
2. is `clientID` is required in kafka config?
3. what is `replicationFactor` in topic config?
4. do we need to specify `numPartitions` in topic config?
5. do we need to specify `waitForLeaders` in topic config?
6. what exactly the `allowAutoTopicCreation` in producer config?
7. is redis having asynchronous and synchronous process?  
8. what is the use of `timeout` in producer?
9. what is consumer `group_id`? what is the use of it?
10. `autoCommit` use in consumer?
11. `readUncommitted` use in consumer?
12. `fromBeginning` use in consumer subscribe?




## TODO
Ask: Upon updating single attribute to an employee
Answer: Then eb fn should do following tasks:
    1.0 Update the respective employee cache information
    2.0 Identify rule group ids from the masters, utilizing the `EB:ATTRIBUTE_RULE_GROUPS` cache to ease the identification job. (subset of the rules contains this attribute), then 
        a. check this rule group is being used in each module's criteria cache `EB:LEAVE_GROUP` and `EB:HR_POLICY_ASSIGNMENT`. If any of the criteria is found then execute that group against that employee cache, then send the satisfied rule ids to respective criteria owners.

Ask: Upon updating single attribute to employees or multiple attributes to employee(s)
Answer: Then eb fn should do these tasks:
    1.0 Update the respective employees cache information
    2.0 repeat 2.a step by skipping 2.0



# Important
[] update `EB:RULE_GROUPS` and `EB:ATTRIBUTE_RULE_GROUPS` cache when any rule changes
[] make sure by adding eviction policy to the random key which was set by consumers while sending employees for evaluation purposes.
[] maintain logs upon updating the cache and re-evaluation.
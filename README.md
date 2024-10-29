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


## Message Eviction
- Using Log Compaction - can be useful if you want to retain only the latest state for each key in the topic.
        - LEAVE_GROUP: A001_COMPANY_CODE
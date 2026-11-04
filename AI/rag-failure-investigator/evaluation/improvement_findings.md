# Retrieval Improvement Experiments

## Baseline

The original pipeline retrieved 5 chunks per question.

- Q1: Relevant Standard-plan feature paragraph was missed.
- Q5: Both Standard-plan seat-limit paragraphs were missed.
- Q6: Both delivery statements were retrieved, but the model failed to use them.

## Experiment 1: Increased Retrieval Depth

Retrieval depth was increased from 5 to 8 for Q1, Q5 and Q6.

- Q1 remained incomplete.
- Q5 remained unanswered.
- Q6 improved: the model identified the DeskHub delivery estimates of 3–5 and 5–7 business days and explicitly reported the disagreement.

## Experiment 2: Query Expansion for Q5

The query was expanded using terms such as "Standard plan", "team members", "seats" and "user limit".

The retriever returned:
- subscription_policy_2: 5 team members.
- customer_faq_2: 10 team members.

The model correctly identified the conflict.

## Experiment 3: Targeted Query for Q1

A targeted query using "shared inboxes", "team collaboration" and "basic performance reports" retrieved subscription_policy_4 at rank 1.

This confirms that the relevant information was present in the knowledge base and that retrieval ranking, rather than chunking, caused the original miss.

## Conclusion

Increasing retrieval depth improved Q6 but did not fix Q1 or Q5. Query expansion fixed Q5, while a targeted query successfully retrieved the missing Q1 feature paragraph.

These experiments demonstrate that retrieval depth and query formulation can materially affect RAG performance.

from retrieval import retrieve_context
from generation import generate_answer

TESTS = {
    "Q1": {
        "question": "What features are included in the AtlasDesk Standard plan?",
        "expanded": "AtlasDesk Standard subscription plan features shared inboxes team collaboration basic performance reports ticket management dashboard web browser mobile application."
    },
    "Q5": {
        "question": "How many users can AtlasDesk support?",
        "expanded": "AtlasDesk Standard plan maximum team members seats user limit 5 members 10 members upgrade Enterprise."
    }
}

for qid, test in TESTS.items():
    contexts = retrieve_context(test["expanded"], top_k=5)

    print(f"\n{'=' * 60}")
    print(qid)

    for context in contexts:
        print(f"{context['source']} | {context['id']}")

    answer = generate_answer(test["question"], contexts)

    print("\nAnswer:")
    print(answer)

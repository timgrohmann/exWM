import nltk
import tarfile
import random
import pickle
import ast
import operator
import math

train = False
test = False

if train:

    from ClassifierBasedGermanTagger.ClassifierBasedGermanTagger import ClassifierBasedGermanTagger

    corp = nltk.corpus.ConllCorpusReader('.', 'tiger_release_aug07.corrected.16012013.conll09',
                                         ['ignore', 'words', 'ignore', 'ignore', 'pos'],
                                         encoding='utf-8')

    tagged_sents = list(corp.tagged_sents())
    # print(len(tagged_sents))
    tagged_sents = tagged_sents[:100]
    # random.shuffle(tagged_sents)

    split_perc = 0.1

    split_size = int(len(tagged_sents) * split_perc)
    train_sents, test_sents = tagged_sents[split_size:], tagged_sents[:split_size]

    tagger = ClassifierBasedGermanTagger(train=train_sents)
    accuracy = tagger.evaluate(test_sents)
    # print(accuracy)

    with open('nltk_german_classifier_data.pickle', 'wb') as f:
        pickle.dump(tagger, f, protocol=2)

else:
    with open('nltk_german_classifier_data.pickle', 'rb') as f:
        tagger = pickle.load(f)


def doit(t, tag_table, llist_scores=False, n=10):
    f = nltk.tokenize.word_tokenize(t)
    print('f:', f)
    t = tagger.tag(f)
    print('t:', t)
    print('Result::')

    print(t)

    def relevance(tag):
        try:
            evaluation = tag_table.get_item(
                Key={
                    'keyword': tag
                }
            )['Item']['evaluation']
            print('RESULT:', evaluation.items())
            helpfulness, suggestion_count = evaluation['helpfulness'], evaluation['suggestion_count']
        except Exception as e:
            print('ERROR', e, e.args)
            helpfulness, suggestion_count = 0, 0
        print(helpfulness, suggestion_count)
        return ((helpfulness + 1) / (suggestion_count + 1))

    def score(tag, count):
        interp = max([math.log2(len(tag) / 16), math.log2(1 + len([x for x in tag if x.isupper()]))])
        print(tag, ':', count, relevance(tag), interp)
        return math.sqrt(int(count)) * float(relevance(tag)) * float(interp)

    tags = [tag for tag, type in t if
            type in 'ADV, NN, NE, VVINF, VVFIN'.split(', ') or len([x for x in tag if x.isupper()]) >= 2]
    counts = {}
    for tag in tags:
        if tag in counts:
            counts[tag] += 1
        else:
            counts[tag] = 1
    print('Counts:')
    print(counts)
    scores = [score(tag, count) for tag, count in counts.items()]
    print(scores)

    if llist_scores:
        l = list(reversed([(tag, score) for tag, score in
                           sorted(dict(zip(counts.keys(), scores)).items(), key=operator.itemgetter(1))]))[:n]
        return l
    else:
        l = list(
            reversed([
                tag for tag, _ in sorted(dict(zip(counts.keys(), scores)).items(), key=operator.itemgetter(1))
            ]))[:n]
        print('End result:\n', dict(zip(counts.keys(), scores)).items(), '\n')
        return l

import nltk
import tarfile
import random
import pickle

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

if test:
    f = [x.translate({ord(i): None for i in '\'\"., \n'}) for x in open('example_text.txt').read().split(' ')]

    f = [a.strip() for l in open('example_text.txt').readlines() for a in l.strip().split(' ')]
    t = tagger.tag(f)
    print(t)
    print([a for a, b in t if b == 'NN'])

def doit(t):
    f = [a.strip().translate({ord(i): None for i in '\'\"., \n'}) for a in t.strip().split(' ')]
    print('f:', f)
    t = tagger.tag(f)
    print('t:', t)
    print('Result::')
    return [a for a, b in t if b in ['NN', 'VVINF', 'NE']]

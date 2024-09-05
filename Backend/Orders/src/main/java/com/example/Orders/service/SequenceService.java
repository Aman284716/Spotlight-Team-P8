package com.example.Orders.service;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class SequenceService {

    @Autowired
    private ReactiveMongoTemplate mongoTemplate;

    public Mono<Integer> getNextSequence(String sequenceName) {
        return mongoTemplate.findAndModify(
                query(where("_id").is(sequenceName)),
                new Update().inc("seq", 1),
                options().returnNew(true).upsert(true),
                Sequence.class
        ).map(Sequence::getSeq);
    }

    @Document(collection = "sequences")
    static class Sequence {
        @Id
        private String id;
        @Setter
        @Getter
        private Integer seq;
    }
}

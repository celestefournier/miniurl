'use strict';
var mongoose = require('mongoose'),
  Shortener = mongoose.model('short-urls'),
  base64url = require('base64url');


/*
 * PUT /create new url
 */
exports.createAlias = function(req, res) {
    var start = new Date();
    
    if (req.query === undefined || req.query.url === undefined) {
        return res.json({
            status: 'Failure',
            message: 'URL must be defined!'
        });
    }
    
    /*
     * Without custom 'alias'
     */
    if (req.query.alias === undefined) {
        var new_shortener = new Shortener({
            url: req.query.url
        });
        new_shortener.save({}, function(err, shortener) {
            new_shortener.alias = generateAlias(String(new_shortener._id));

            new_shortener.save({}, function(err, shortener) {
                if (err)
                    res.send(err);
                var end = new Date() - start;
                var result = shortener.toObject();
                result.statistics = { time_taken: end+"ms" };
                res.json(result);
            });
        });
    }
    
    /*
     * Custom 'alias'
     */
    else {
        Shortener.count({alias : req.query.alias}, function (err, count){ 
            if(count>0){
                return res.json({
                    status: 'Failure',
                    message: 'This alias is already in use.'
                });
            } else {
                var new_shortener = new Shortener(req.query);
                new_shortener.save({}, function(err, shortener) {
                    if (err)
                        res.send(err);
                    var end = new Date() - start;
                    var result = shortener.toObject();
                    result.statistics = { time_taken: end+"ms" };
                    res.json(result);
                });
            }
        });
    }
};

/*
 * GET /:alias checks for 'alias' existence and redirect user
 */
exports.acessAlias = function(req, res) {
    Shortener.findOne({ 'alias': req.params.alias }, function (err, result) {
        if (err) return handleError(err);

        if (result) {
            Shortener.findByIdAndUpdate(result._id, {$set: {views: ++result.views}}, {new: true}, function (err, response) {
                if (err) return handleError(err);
            });
              
            res.redirect(result.url);
        } else {
            return res.json({
                status: 'Failure',
                message: 'Alias not found.'
            });
        }
    });
};

/*
 * GET /top-urls Displays the top 10 most popular URLs
 */
exports.topURLs = function(req, res) {
    Shortener.find({}).sort('-views').limit(10).exec(function (err, result) {
        if (err) return handleError(err);
        res.json(result);
    });
}

/* 
** Generates an Alias with the ID, taking the last N digits in base64.
** As time passes, this number can be increased to avoid collision.
*/
function generateAlias(id) {
    var aliasSize = 6;      // The "N digits"
    var base64Id = base64url(id);
    var encodePosition = base64Id.length - aliasSize;
    var alias = "";

    do {
        var repeatedAlias = false;
        alias = base64Id.slice(encodePosition, encodePosition + aliasSize);

        Shortener.count({"alias": alias}, function (err, count){ 
            if(count>0){
                repeatedAlias = true;
                encodePosition--;
            }
        });
    } while (repeatedAlias);

    return alias;
}
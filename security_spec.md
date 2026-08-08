# Security Specification for SANTECH TZ Firestore

## 1. Data Invariants
- Articles can be read by anyone, created by admins or AI server service.
- Forum posts can be created by any user or visitor, read by anyone.
- Comments on articles can be created by any user or visitor, read by anyone.
- Quiz results can be submitted by any user, read by anyone.

## 2. The Dirty Dozen Test Payloads
1. **Unauthenticated Admin Override**: Attempting to set `isAiGenerated: false` or change article fields without valid format.
2. **Junk Document ID**: Attempting to use a 1MB string as a postId or commentId.
3. **Massive String Attack**: Attempting to post a forum message over 2000 characters.
4. **Negative Likes**: Attempting to update `likes` to a negative number.
5. **Role Escalation**: Attempting to forge `authorRole` to "System Admin".
6. **Corrupt Array**: Injecting non-string elements inside `content` array for articles.
7. **Orphaned Comment**: Commenting without an `articleId`.
8. **Invalid Quiz Score**: Setting score greater than total.
9. **Missing Required Field**: Posting a forum topic with no `message`.
10. **Client Spoofing**: Attempting to delete another user's post without ownership.
11. **Malicious Regex**: Passing script tags in `author` or `text`.
12. **Future Timestamp**: Passing client timestamp far in the future.

## 3. Test Runner
Verified with Firestore security rules plugin.

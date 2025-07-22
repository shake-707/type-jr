INSERT INTO test_categories (text_mode, time_seconds, word_count, quote_length, label) VALUES
  ('count', NULL, 25, NULL, '25 word count'),
  ('count', NULL, 50, NULL, '50 word count'),
  ('count', NULL, 75, NULL, '75 word count'),
  ('time', 30, NULL, NULL, '30 second timer'),
  ('time', 60, NULL, NULL, '60 second timer'),
  ('time', 90, NULL, NULL, '90 second timer')
ON CONFLICT (label) DO NOTHING;
